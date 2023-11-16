import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_BUCKET_PATH as string,
  process.env.REACT_APP_SUPABASE_SECRET_API_KEY as string
);

export async function uploadImage(
  file: File,
  restaurantId: string,
  path?: string,
  reviewId?: string
) {
  const { data } = await supabase.storage
    .from("restaurant")
    .upload(`/${path}/${restaurantId}/${reviewId}.jpg`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(data);
}
