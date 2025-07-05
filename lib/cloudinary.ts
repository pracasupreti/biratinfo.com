// lib/cloudinary.ts

// Post Image functions
export const uploadImage = async (file: File): Promise<{ url: string; public_id: string }> => {
    console.log("ROute Hit")

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary env vars are missing")
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'biratinfo/posts/images');

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
    );

    const data = await res.json();

    if (!res.ok) {
        console.error("Cloudinary Upload Error:", data);
        throw new Error(data.error?.message || "Upload failed");
    }

    return { url: data.secure_url, public_id: data.public_id };
};


export const deleteImage = async (public_id: string): Promise<void> => {
    const res = await fetch('/api/cloudinary/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to delete image');
    }
};


// Post Audio functions
export const uploadAudio = async (file: File): Promise<{ url: string; public_id: string; duration?: number }> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_AUDIO_PRESET;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset!);
    formData.append('folder', 'biratinfo/posts/audio');
    formData.append('resource_type', 'video');

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        { method: 'POST', body: formData }
    );

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error?.message || 'Audio upload failed');
    }

    const data = await res.json();
    return {
        url: data.secure_url,
        public_id: data.public_id,
        duration: data.duration
    };
};

export const deleteAudio = async (public_id: string): Promise<void> => {
    const res = await fetch('/api/cloudinary/delete-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to delete audio');
    }
};