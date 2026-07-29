-- Run after creating public bucket "journal-images"

create policy "public read journal images" on storage.objects
  for select using (bucket_id = 'journal-images');

create policy "auth upload journal images" on storage.objects
  for insert with check (bucket_id = 'journal-images' and auth.role() = 'authenticated');

create policy "auth update journal images" on storage.objects
  for update using (bucket_id = 'journal-images' and auth.role() = 'authenticated');

create policy "auth delete journal images" on storage.objects
  for delete using (bucket_id = 'journal-images' and auth.role() = 'authenticated');
