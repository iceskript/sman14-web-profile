import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { MyLogoComponent } from './components/MyLogo';
import React from 'react'

const LogoSekolah = () => (
  <img 
    src="/static/logo-smapas.svg" 
    alt="Logo SMAN 14" 
    style={{ width: '25px', height: '25px', borderRadius: '4px' }} 
  />
);

export default defineConfig({
  name: 'default',
  title: 'Dashboard Admin SMAN 14',

  projectId: 'vn9r43ot',
  dataset: 'production',

  icon: LogoSekolah,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: () => (
        React.createElement('div', { 
          style: { 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '4px' 
          } 
        }, [
          React.createElement('img', {
            key: 'logo-smapas',
            src: '/logo-smapas.svg', // Langsung panggil nama file
            alt: 'Logo SMAN 14',
            style: { height: '32px', width: 'auto' }
          }),
          React.createElement('span', { 
            key: 'text-smapas',
            style: { fontWeight: 'bold', fontSize: '18px' } 
          }, 'SMAN 14')
        ])
      )
    }
  }
})