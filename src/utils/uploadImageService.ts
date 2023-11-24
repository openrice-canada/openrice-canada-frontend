import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_BUCKET_PATH as string,
  process.env.REACT_APP_SUPABASE_SECRET_API_KEY as string
);

export async function uploadImage(
  file: File,
  restaurantID: string,
  path?: string,
  id?: string,
  imageName?: string,
  fileExtension?: string
) {
  if (!path) {
    await supabase.storage
      .from("restaurant")
      .upload(`/${restaurantID}/cover_image_url.${fileExtension}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
  } else {
    if (id && fileExtension) {
      await supabase.storage
        .from("restaurant")
        .upload(`/${restaurantID}/${path}/${id}.${fileExtension}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
    } else if (imageName) {
      await supabase.storage
        .from("restaurant")
        .upload(`/${restaurantID}/${path}/${imageName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
    }
  }
}
