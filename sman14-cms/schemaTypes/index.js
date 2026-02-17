import prestasiSiswa from './prestasiSiswa';
import alumni from './alumni';
import berita from './berita';
import strukturOrganisasi from './strukturOrganisasi';
import pendaftaran from './pendaftaran';
import saranaPrasarana from './saranaPrasarana';
import sertifikat from './sertifikat';
import galeri from './galeri';
import admin from './admin';

// Masukkan 'admin' ke dalam array agar muncul di Sanity Studio
export const schemaTypes = [
  prestasiSiswa, 
  alumni, 
  berita, 
  strukturOrganisasi, 
  pendaftaran, 
  saranaPrasarana, 
  sertifikat, 
  galeri,
  admin 
];