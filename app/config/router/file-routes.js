export default [
  {
    path: '/files',
    name: 'fileIndex',
    component: () => import('components/pages/page-files')
  },

  {
    path: '/file/:fileId',
    name: 'fileShow',
    component: () => import('components/pages/page-file'),
    props: route => ({
      fileId: Number(route.params.fileId)
    })
  }
];
