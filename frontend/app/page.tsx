// app/page.tsx
import HeroSection from '@/components/HeroSection'
import StoreInfo from '@/components/StoreInfo'
import CatalogSection from '@/components/CatalogSection'
import ContactsSection from '@/components/ContactsSection'

export default function Home() {
    return (
        <main className="bg-neutral-950 min-h-screen">
            <HeroSection />
            <StoreInfo />    
            <CatalogSection />
            <ContactsSection />
        </main>
    )
}