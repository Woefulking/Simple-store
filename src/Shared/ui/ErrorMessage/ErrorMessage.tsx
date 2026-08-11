import { TfiFaceSad } from "react-icons/tfi";

export const ErrorMessage = () => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-6">
            <TfiFaceSad className="size-20 md:size-32 [&_svg]:fill-muted" />
            <span className="text-center text-lg md:text-2xl text-muted font-medium max-w-md">Failed to load products. Please refresh the page.</span>
        </div>
    )
}