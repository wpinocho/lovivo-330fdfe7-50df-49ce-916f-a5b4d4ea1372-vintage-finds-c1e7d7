import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ShoppingBag, Sparkles, Heart, Recycle } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique brands and conditions from product tags
  const brands = Array.from(new Set(filteredProducts.flatMap(p => p.tags || []).filter(tag => 
    ['Levi\'s', 'Designer', 'Vintage'].includes(tag)
  )));
  
  const conditions = Array.from(new Set(filteredProducts.flatMap(p => p.tags || []).filter(tag => 
    ['Excellent', 'Very Good', 'Good'].includes(tag)
  )));

  // Filter products based on selected filters
  const displayProducts = filteredProducts.filter(product => {
    const productTags = product.tags || [];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.some(b => productTags.includes(b));
    const conditionMatch = selectedConditions.length === 0 || selectedConditions.some(c => productTags.includes(c));
    return brandMatch && conditionMatch;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedConditions([]);
  };

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative bg-foreground text-background py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/src/assets/hero-vintage.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6 border border-primary/30">
            <Recycle className="h-4 w-4" />
            <span className="text-sm font-medium">Sustainable Fashion</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Buy & Sell
            <span className="block text-primary mt-2">Vintage Fashion</span>
          </h1>
          
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Curated secondhand & recommerce marketplace for unique vintage finds. 
            Sustainable style that tells a story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Explore Finds
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-background/30 text-background hover:bg-background/10"
            >
              <Heart className="mr-2 h-5 w-5" />
              Sell Your Items
            </Button>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-background/70">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span>Authenticated Items</span>
            </div>
            <div className="flex items-center gap-2">
              <Recycle className="h-4 w-4 text-secondary" />
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-secondary" />
              <span>Unique Pieces</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Curated Collections
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hand-picked vintage pieces organized by style, era, and vibe
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section with Filters */}
      <section className="py-16" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'}` 
                  : 'All Vintage Finds'
                }
              </h2>
              <p className="text-muted-foreground">
                {displayProducts.length} {displayProducts.length === 1 ? 'item' : 'items'} available
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {selectedCollectionId && (
                <Button 
                  variant="outline" 
                  onClick={handleShowAllProducts}
                  className="whitespace-nowrap"
                >
                  See All Items
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(selectedBrands.length + selectedConditions.length > 0) && (
                  <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {selectedBrands.length + selectedConditions.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filter By</h3>
                {(selectedBrands.length + selectedConditions.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand Filter */}
                {brands.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">Brand</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedBrands.includes(brand)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground hover:bg-muted/80'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Condition Filter */}
                {conditions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">Condition</h4>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map(condition => (
                        <button
                          key={condition}
                          onClick={() => toggleCondition(condition)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedConditions.includes(condition)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground hover:bg-muted/80'
                          }`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No items match your filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore More Finds
            </Button>
          </div>
        </div>
      </section>

      {/* Care Guide Section */}
      <section className="py-16 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Vintage Care Guide
              </h2>
              <p className="text-muted-foreground text-lg">
                Keep your vintage treasures looking their best with proper care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Gentle Washing</h3>
                <p className="text-muted-foreground text-sm">
                  Hand wash or use delicate cycle for vintage fabrics. Cold water preserves colors and prevents shrinking.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Proper Storage</h3>
                <p className="text-muted-foreground text-sm">
                  Store in breathable garment bags away from direct sunlight. Use padded hangers for delicate items.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Repair & Restore</h3>
                <p className="text-muted-foreground text-sm">
                  Small repairs can extend the life of vintage pieces. Consider professional restoration for valuable items.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                View Full Care Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};
