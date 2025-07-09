// components/AudioPlayer.tsx
'use client'
import { Volume2Icon } from 'lucide-react';
import ReactAudioPlayer from 'react-audio-player';

type AudioData = {
    url: string;
    public_id: string;
    duration?: number;
};

const AudioPlayer = ({ audioFile }: { audioFile?: AudioData | null }) => {
    if (!audioFile?.url) return null;

    return (
        <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
                <Volume2Icon className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-gray-800">अडियो संस्करण</h3>
            </div>
            <ReactAudioPlayer
                src={audioFile.url}
                controls
                className="w-full rounded-lg"
            />
        </div>
    );
};

export default AudioPlayer;
