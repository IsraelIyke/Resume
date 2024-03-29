import { useEffect, useState } from "react";
import { supabase } from "../client";

export default function PersonalAvatar({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) {
      downloadImage(url);
    }
  }, [url]);

  async function downloadImage() {
    try {
      const { data, error } = await supabase.storage.from("avatars");
      // .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }
  return (
    <>
      {avatarUrl ? (
        <img src={avatarUrl} alt="avatar" />
      ) : (
        <img src={avatarUrl} alt="avatar" />
      )}
      <div>
        <button>{uploading ? "uploading..." : "Upload"}</button>
        <input onChange={uploadAvatar} disabled={uploading} />
      </div>
    </>
  );
}
