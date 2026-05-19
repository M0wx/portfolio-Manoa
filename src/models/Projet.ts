export interface Projet {
  id: number
  titre: string
  description: string
  mediaUrl: string
  typeMedia: 'image' | 'video'
  lienProjet: string
  technos: string[]
}