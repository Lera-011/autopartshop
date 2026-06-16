import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const productId = formData.get('productId') as string

        if (!file) {
            return NextResponse.json({ error: 'No file' }, { status: 400 })
        }

        const fileName = `${Date.now()}_${file.name}`
        const { data, error } = await supabase.storage
            .from('products')
            .upload(fileName, file)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        const { data: urlData } = supabase.storage
            .from('products')
            .getPublicUrl(fileName)

        await supabase
            .from('products')
            .update({ image_url: urlData.publicUrl })
            .eq('id', parseInt(productId))

        return NextResponse.json({ url: urlData.publicUrl })
    } catch (error) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}