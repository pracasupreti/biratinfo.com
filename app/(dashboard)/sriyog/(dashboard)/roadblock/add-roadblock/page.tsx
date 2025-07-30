// app/sriyog/roadblocks/add-roadblock/page.tsx
'use client';

import RoadblockForm from "../RoadBlockForm";

export default function AddRoadblockPage() {
    return (
        <div className="container mx-auto py-8">
            <RoadblockForm mode="create" />
        </div>
    );
}