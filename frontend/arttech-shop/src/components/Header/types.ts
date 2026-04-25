/** Represents a navigation link in the site header */
export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isActive?: boolean;
}
