import React from 'react';

const PlaceholderModule = ({ title, description, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-brand-primary" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white/50 max-w-md">{description}</p>
      
      <div className="mt-8 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <p className="text-amber-500 text-sm font-medium">UI Mockup / Coming Soon — Backend integration pending</p>
      </div>
    </div>
  );
};

export default PlaceholderModule;
