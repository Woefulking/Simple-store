import { FaReact } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from 'react-icons/hi';
import React, { useState } from "react";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { categories } from "Shared/constants/categories";
import { Link } from "react-router";
import { useFilterStore } from "Widgets/Filters/model/FiltersStore";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { useCartStore } from "Entities/Cart";
import { useFavoritesStore } from "Entities/Favorites";
import { Avatar, useUserStore } from "Entities/User";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  <header className="relative z-50 flex flex-wrap items-center justify-between border-b border-primary-border bg-secondary px-6 py-4 shadow-soft xl:px-10">
  
  <Link to="/" className="flex items-center gap-4 font-semibold text-primary text-xl">
    <FaReact className="animate-spin-slow text-[56px]" />
    <Title variant={TitleVariants.H1} className="my-0!">ReactStore</Title>
  </Link>

  <Button 
    variant={ButtonVariants.ICON} 
    onClick={() => setIsMenuOpen(!isMenuOpen)} 
    className="block p-2 text-primary-text hover:text-accent xl:hidden focus:outline-none"
  >
    {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
  </Button>

  <div className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full h-[calc(100vh-73px)] flex-col gap-8 bg-secondary p-6 z-50 overflow-y-auto xl:static xl:w-auto xl:h-auto xl:flex xl:flex-row xl:items-center xl:gap-8 xl:p-0 xl:overflow-visible`}>
    <div className="relative flex items-center w-full order-0 xl:order-1 xl:w-auto">
      <input
        type="text"
        name="search"
        value={search}
        placeholder="Search products..."
        onChange={handleChange}
        className="w-full rounded-2xl border border-primary-border bg-tertiary px-4 py-3 pr-10 text-base text-primary placeholder-muted transition-all outline-none hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent/30 xl:py-2 xl:text-sm xl:w-50 2xl:w-62.5"
      />
      <CiSearch size={24} className="absolute right-3 pointer-events-none text-muted" />
    </div>

    <nav className="w-full xl:w-auto order-1 xl:order-0">
      <ul className="flex flex-col gap-6 list-none xl:flex-row xl:gap-6">
        {categories.map((category) => (
          <li key={category.type} className="relative group text-lg xl:text-base">
            <Link
              to={category.type === 'all' ? '/' : `/${category.type}`}
              className="text-secondary-text transition-colors duration-200 group-hover:text-primary py-2 block border-b border-primary-border/30 xl:border-none xl:py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <div className="flex flex-col gap-6 mt-auto border-t border-primary-border pt-6 xl:mt-0 xl:border-none xl:pt-0 xl:flex-row xl:items-center xl:gap-4 order-2">       
      <div className="flex items-center gap-6 justify-around xl:justify-end xl:gap-3">
        
        <Link to="/favorites" className="relative p-2 text-primary-text hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
          <FiHeart className="size-8 xl:size-7.5" />
          {favoriteCount > 0 && (
            <div className="absolute top-0 right-0 flex min-w-5 h-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-primary">
              {favoriteCount}
            </div>
          )}
        </Link>

        <Link to="/cart" className="relative p-2 text-primary-text hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
          <IoCartOutline className="size-9.5 xl:size-9" />
          {cartLength > 0 && (
            <div className="absolute top-0 right-0 flex min-w-5 h-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-primary">
              {cartLength}
            </div>
          )}
        </Link>

        {isAuth ? (
          <Link to="/profile" className="p-1" onClick={() => setIsMenuOpen(false)}>
             <Button variant={ButtonVariants.ICON}>
                <Avatar size='m' />
              </Button>
          </Link>
        ) : (
          <Link to="/auth" className="w-full flex justify-center sm:w-auto xl:w-auto" onClick={() => setIsMenuOpen(false)}>
            <Button variant={ButtonVariants.BLUE} padding className="w-full max-w-70 sm:max-w-none sm:w-auto xl:w-auto">
              Login
            </Button>
          </Link>
        )}

      </div>
    </div>

  </div>
</header>
  );

};
