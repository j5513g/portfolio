-- Run in Supabase SQL Editor (existing projects)

alter table journal_posts add column if not exists date_end date;
alter table journal_posts add column if not exists images jsonb not null default '[]';

update journal_posts
set images = jsonb_build_array(
  jsonb_build_object('url', image_url, 'rotation', 0, 'zoom', 1, 'posX', 50, 'posY', 50)
)
where image_url is not null
  and (images is null or images = '[]'::jsonb);

-- optional: drop legacy column after migration
-- alter table journal_posts drop column image_url;
