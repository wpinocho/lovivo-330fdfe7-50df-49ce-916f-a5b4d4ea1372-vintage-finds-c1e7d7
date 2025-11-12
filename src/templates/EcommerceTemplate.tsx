import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Recycle } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Recycle className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-foreground">VintageFind</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-foreground font-medium transition-colors"
              >
                Shop
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-foreground font-medium transition-colors"
              >
                Blog
              </Link>
              <button className="text-foreground/70 hover:text-foreground font-medium transition-colors">
                Sell
              </button>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-primary/10"
                aria-label="View cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-background py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Recycle className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl">VintageFind</span>
            </div>
            <p className="text-background/70 mb-4">
              Your trusted secondhand & recommerce marketplace for authentic vintage fashion. Sustainable style with a story.
            </p>
            <SocialLinks />
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Shop</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                All Items
              </Link>
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                Collections
              </Link>
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4 text-background">About</h3>
            <div className="space-y-2">
              <Link 
                to="/blog" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                Blog
              </Link>
              <button className="block text-background/70 hover:text-background transition-colors">
                Sell With Us
              </button>
              <button className="block text-background/70 hover:text-background transition-colors">
                Sustainability
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center text-background/70">
          <p>&copy; 2024 VintageFind. Sustainable fashion marketplace.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}
