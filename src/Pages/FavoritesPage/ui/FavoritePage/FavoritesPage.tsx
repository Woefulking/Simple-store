import { Title, TitleVariants } from 'Shared/ui/Title/Title';
import { useFavoritesStore } from 'Entities/Favorites';
import { FavoriteItem } from 'Features/FavoriteItem';

export const FavoritesPage = () => {
    const favorites = useFavoritesStore((state) => state.items);
    return (
        <div className="w-full max-w-3xl mx-auto h-full flex flex-col px-4 md:px-0 text-primary">
            {favorites.length > 0 ? (
                <>
                    <Title variant={TitleVariants.H1}>Favorites</Title>
                    <div className="flex flex-col gap-4">
                        {favorites.map((item) => (
                            <FavoriteItem item={item} key={item.id} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex justify-center items-center text-2xl md:text-4xl text-secondary-text font-medium py-20">Your favorites list is empty</div>
            )}
        </div>
    )
}