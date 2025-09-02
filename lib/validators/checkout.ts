import { z } from 'zod'

export const checkoutSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Numéro de téléphone invalide'),
  deliveryType: z.enum(['DELIVERY', 'CLICK_COLLECT']),
  ageVerified: z.boolean().refine((val) => val === true, {
    message: "Vous devez avoir plus de 18 ans pour commander"
  }),
}).and(
  z.discriminatedUnion('deliveryType', [
    z.object({
      deliveryType: z.literal('DELIVERY'),
      address: z.string().min(5, 'Adresse requise'),
      city: z.string().min(2, 'Ville requise'),
      postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
    }),
    z.object({
      deliveryType: z.literal('CLICK_COLLECT'),
      storeId: z.string().min(1, 'Veuillez sélectionner une boutique'),
      pickupDate: z.string().min(1, 'Date de retrait requise'),
      pickupTime: z.string().min(1, 'Heure de retrait requise'),
    }),
  ])
)

export type CheckoutFormData = z.infer<typeof checkoutSchema>