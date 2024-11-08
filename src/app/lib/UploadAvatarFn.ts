import { createClient } from "@supabase/supabase-js";


export async function UploadAvatarFn(image:File)  {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const suapbaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const supabase =  createClient(supabaseUrl,suapbaseKey);
    const data = await supabase.storage.from('avatars').upload(`${image.name}_${Date.now()}`, image);

    const urlData = data?.data?.path ? await supabase.storage.from('avatars').getPublicUrl(data.data?.path) : null;

    return urlData?.data.publicUrl;
}

export default UploadAvatarFn;