import React from 'react';
import classNames from 'classnames';
import './Layout.css';

function Layout({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={classNames('layout', className)}>{children}</div>;
}

export default Layout;
