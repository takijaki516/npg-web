create or replace function add_daily_workouts(body json)
returns void
language plpgsql
as $$
declare
  start_time timestamptz;
  user_email varchar(255);
  user_id uuid;
  inserted_daily_weights_exercise uuid;
  each_weights json; -- Define a variable to hold each JSON object from the array
  each_weights_id uuid;
  workout_name text;
  body_part text;
  set_info json; -- Define a variable to hold each JSON object from the nested array
  set_number int4;
  reps int4;
  kg int4;
begin
  -- extract
  start_time := (body->>'start_time')::timestamptz;
  user_email := (body->>'user_email')::varchar(255);
  user_id := (body->>'user_id')::uuid;

  -- insert
  insert into daily_weights_exercises (start_time, user_email, user_id)
  values (start_time, user_email, user_id)
  returning id into inserted_daily_weights_exercise;

  -- Loop through the 'weights_workouts' array
  for each_weights in select json_array_elements(body->'weights_workouts')
  loop
    workout_name := (each_weights->>'workout_name')::text;
    body_part := (each_weights->>'body_part')::text;

    insert into each_weights_exercises(user_email, user_id, weights_exercises_id, workout_name, body_part)
    values (user_email, user_id, inserted_daily_weights_exercise, workout_name, body_part)
    returning id into each_weights_id;

    -- Loop through the 'weights_workouts_sets' array within each 'weights_workouts' object
    for set_info in select json_array_elements(each_weights->'weights_workouts_sets')
    loop
      set_number := (set_info->>'set_number')::int4;
      reps := (set_info->>'reps')::int4;
      kg := (set_info->>'kg')::int4;

      insert into each_weights_exercises_set_info(user_email, user_id, each_weights_exercises_id, reps, kg, set_number)
      values (user_email, user_id, each_weights_id, reps, kg, set_number);
    end loop;
  end loop;
end;
$$;




create or replace function add_meals(body json)
returns void
language plpgsql
as $$
declare
  user_email varchar(255);
  user_id uuid;

  meal_time timestamptz;
  total_calories float4;
  total_carbohydrate float4;
  total_fat float4;
  total_protein float4;

  inserted_meal_id uuid;
  food json;

  food_name text;
  pic_url text;
  calories float4;
  protein float4;
  fat float4;
  carbohydrate float4;
begin
  -- extract
  user_email := (body->>'user_email')::varchar(255);
  user_id := (body->>'user_id')::uuid;
  meal_time := (body->>'meal_time')::timestamptz;
  total_calories := (body->>'total_calories')::float4;
  total_carbohydrate := (body->>'total_carbohydrate')::float4;
  total_fat := (body->>'total_fat')::float4;
  total_protein := (body->>'total_protein')::float4;

  -- insert
  insert into meals (user_email, user_id, meal_time, total_calories, total_carbohydrate, total_fat, total_protein)
  values (user_email, user_id, meal_time, total_calories, total_carbohydrate, total_fat, total_protein)
  returning id into inserted_meal_id;

  -- Loop through the 'weights_workouts' array
  for food in select json_array_elements(body->'foods')
  loop
    food_name := (food->>'food_name')::text;
    pic_url := (food->>'pic_url')::text; -- when casting null to text, null remains null
    calories := (food->>'calories')::float4;
    protein := (food->>'protein')::float4;
    fat := (food->>'fat')::float4;
    carbohydrate := (food->>'carbohydrate')::float4;

    insert into foods(user_email, user_id, meal_id, food_name, pic_url, calories, protein, fat, carbohydrate)
    values (user_email, user_id, inserted_meal_id, food_name, pic_url, calories, protein, fat, carbohydrate);
  end loop;
end;
$$;
