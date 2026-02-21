import prestasiSiswa from './prestasiSiswa';
import alumni from './alumni';
import berita from './berita';
import tenagaKependidikan from './tenagaKependidikan';
import dewanGuru from './dewanGuru';
import pendaftaran from './pendaftaran';
import saranaPrasarana from './saranaPrasarana';
import sertifikat from './sertifikat';
import galeri from './galeri';
import admin from './admin';
import strukturOrganisasiPage from './strukturOrganisasiPage';

// Masukkan 'admin' ke dalam array agar muncul di Sanity Studio
export const schemaTypes = [
  prestasiSiswa, 
  alumni, 
  berita, 
  tenagaKependidikan,
  dewanGuru,
  pendaftaran, 
  saranaPrasarana, 
  sertifikat, 
  strukturOrganisasiPage,
  galeri,
  admin 
];