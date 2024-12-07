-- trigger for auth
-- Drop in reverse order of creation
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- inserts a row into public.profiles
create function public.handle_new_user () returns trigger language plpgsql security definer
set
  search_path = '' as $$
begin
  insert into public.profiles (user_id, username)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ()