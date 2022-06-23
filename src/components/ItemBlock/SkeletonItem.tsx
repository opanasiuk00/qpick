import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonItem = (props: any) => (
  <ContentLoader
    speed={3}
    width={350}
    height={380}
    viewBox="0 0 350 380"
    backgroundColor="#ffffff"
    foregroundColor="#e6e5e5"
    {...props}>
    <rect x="0" y="0" rx="20" ry="20" width="350" height="380" />
  </ContentLoader>
);

export default SkeletonItem;
