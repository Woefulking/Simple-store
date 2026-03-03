import clsx from 'clsx';
import cls from './FavoritesPage.module.scss';
import { Title, TitleVariants } from 'Shared/ui/Title/Title';
import { useFavoritesStore } from 'entities/Favorites';
import { FavoriteItem } from 'Features/FavoriteItem';

export const FavoritesPage = () => {
    const favorites = useFavoritesStore((state) => state.items);
    return (
        <div className={clsx(cls.favorites)}>
            {favorites.length > 0 ? (
                <>
                    <Title variant={TitleVariants.H1}>Избранное</Title>
                    <div className={clsx(cls.list)}>
                        {favorites.map((item) => (
                            <FavoriteItem item={item} key={item.id} />
                        ))}
                    </div>
                </>
            ) : (
                <div className={clsx(cls.empty)}>Список избранных товаров пуст</div>
            )}
        </div>
    )
}