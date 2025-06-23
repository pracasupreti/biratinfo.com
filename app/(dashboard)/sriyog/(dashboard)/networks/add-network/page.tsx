import NetworkForm from "./NetworkTable";


export default function NewNetworkPage() {
    return (
        <div className="container mx-auto py-8">
            <NetworkForm mode="create" />
        </div>
    )
}