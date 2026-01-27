# Media player (Supabase realtime)

This project ships with a multi-platform music player that supports:
- Fallback playlist mode (YouTube / Spotify / SoundCloud playlists)
- Live DJ override (tracks or playlists)

## Supabase schema

Run this SQL in Supabase → SQL Editor:

```sql
create table if not exists public.player_state (
  id uuid primary key,
  mode text not null check (mode in ('fallback','live')) default 'fallback',
  fallback_platform text null check (fallback_platform in ('youtube','spotify','soundcloud')),
  fallback_url text null,
  live_platform text null check (live_platform in ('youtube','spotify','soundcloud')),
  live_url text null,
  updated_at timestamptz not null default now(),
  updated_by text
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger player_state_updated
before update on public.player_state
for each row execute function public.set_updated_at();

insert into public.player_state (id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;
```

## Realtime configuration

1. Supabase → Database → Replication → enable realtime for `player_state`.
2. Supabase → Authentication → Policies:
   - Enable RLS on `player_state`.
   - Add a **SELECT** policy that allows read access:
     ```sql
     create policy "Public read player state"
     on public.player_state
     for select
     using (true);
     ```

Updates are performed server-side with the service role key, so no public write policy is required.

## Sanity user tokens

DJ updates are authenticated with a Sanity user token. Each DJ should generate a personal token in
Sanity → Project → API → Tokens. The token is entered on `/media/dj` and stored in local storage.
