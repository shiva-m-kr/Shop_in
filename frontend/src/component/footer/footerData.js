import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiGithub
} from 'react-icons/fi'

export const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'All Collections', path: '/collection' },
  { name: 'Best Sellers', path: '/product' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact & Support', path: '/contact' }
]

export const CATEGORY_LINKS = [
  { name: "Men's Wear", path: '/collection' },
  { name: "Women's Collection", path: '/collection' },
  { name: 'Kids & Teens', path: '/collection' },
  { name: 'Footwear & Bags', path: '/collection' },
  { name: 'Winter Essentials', path: '/collection' }
]

export const SOCIAL_LINKS = [
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com' }
]
