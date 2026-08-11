import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Modal } from "../Modal/Modal";

export const Loading = () => {
    return (
        <Modal onClose={() => {}} className="bg-transparent! border-none! shadow-none!">
            <AiOutlineLoading3Quarters className="size-14 md:size-21.5 animate-spin text-muted" />
        </Modal>
    )
}