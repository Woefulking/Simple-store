import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { Modal } from "Shared/ui/Modal/Modal";
import { Title, TitleVariants } from "Shared/ui/Title/Title";

interface DeleteAccountModalProps {
    onClose: () => void;
    onDelete: () => void;
}

export const DeleteAccountModal = (props: DeleteAccountModalProps) => {
    const { onClose, onDelete } = props;

    return (
        <Modal onClose={onClose} className="max-w-80!">
            <div className="flex flex-col gap-6 w-full text-primary">
                <Title variant={TitleVariants.H2} className="text-center mb-0! font-bold text-danger">Warning</Title>
                <p className="text-center text-sm text-secondary-text leading-relaxed px-1"> Are you sure you want to delete your account? This action is permanent and all your order history will be lost forever.</p>
                <div className="flex flex-row gap-3 mt-2">
                    <Button onClick={onDelete}  padding={true} variant={ButtonVariants.RED} className="w-full">Delete</Button>
                    <Button onClick={onClose}  padding={true} variant={ButtonVariants.LIGHT_GREY} className="w-full">Close</Button>
                </div>
            </div>
        </Modal>
    )
}