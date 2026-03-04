import { FaReact } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { categories } from "Shared/constants/categories";
import { Link } from "react-router";
import { useFilterStore } from "Widgets/Filters/model/FiltersStore";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { useCartStore } from "entities/Cart";
import { useFavoritesStore } from "entities/Favorites";
import { Avatar, useUserStore } from "entities/User";
import cls from "./Header.module.scss";
import clsx from "clsx";

export const Header = () => {
  const [search, setSearch] = useState("");
  const filterDispatch = useFilterStore((state) => state.dispatch);

  const cartItems = useCartStore((state) => state.items);
  const cartLength = cartItems.length;

  const favoriteCount = useFavoritesStore((state) => state.items.length);
  const isAuth = useUserStore((state) => state.isAuth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearch(text);

    filterDispatch({
      type: "search",
      payload: text,
    });
  }

  return (
    <header className={clsx(cls.header)}>
      <Link to={'/'}>
        <div className={clsx(cls.logo)}>
          <FaReact size={56} className={clsx(cls.logoImg)} />
          <Title variant={TitleVariants.H1} className={clsx(cls.title)}>
            ReactStore
          </Title>
        </div>
      </Link>
      <nav className={clsx(cls.nav)}>
        <ul className={clsx(cls.navList)}>
          {categories.map((category) => (
            <li
              key={category.type}
              className={clsx(cls.navItem)}
            >
              <Link to={category.type === 'all' ? '/' : `/${category.type}`}>
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={clsx(cls.actions)}>
        <div className={clsx(cls.search)}>
          <input
            type="text"
            name="search"
            value={search}
            className={clsx(cls.searchInput)}
            placeholder="Search products"
            onChange={handleChange}
          />
          <CiSearch size={24} className={clsx(cls.searchIcon)} />
        </div>
        <Link to={'/favorites'}>
          <Button variant={ButtonVariants.ICON} className={clsx(cls.favorite)}>
            <FiHeart size={30} />
            {favoriteCount > 0 && (
              <div className={clsx(cls.favoriteCount)}>
                {favoriteCount}
              </div>
            )}
          </Button>
        </Link>
        <Link to={'/cart'}>
          <Button variant={ButtonVariants.ICON} className={clsx(cls.cart)}>
            <IoCartOutline size={36} />
            {cartLength > 0 && (
              <div className={clsx(cls.cartCount)}>
                {cartLength}
              </div>
            )}
          </Button>
        </Link>
        {isAuth ?
          <Link to='/profile'>
            <Button variant={ButtonVariants.ICON}>
              <Avatar size='m' />
            </Button>
          </Link>
          :
          <Link to={'/auth'}>
            <Button variant={ButtonVariants.BLUE} padding={true}>
              Login
            </Button>
          </Link>
        }
      </div>
    </header >
  );
};
