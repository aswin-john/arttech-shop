/** A child link rendered inside a dropdown menu */
export interface NavLinkChild {
  label: string;
  href: string;
}

/** Represents a navigation link in the site header */
export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  children?: NavLinkChild[];
}
