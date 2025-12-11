'use client';

import React, { useState } from 'react';
import {
  PrimaryButton,
  SecondaryButton,
  IconButton,
  TextInput,
  EmailInput,
  PasswordInput,
  SearchInput,
  Card,
  FileCard,
  PricingCard,
  StorageCard,
  Modal,
  ConfirmationDialog,
  PasswordProtectionModal,
  Badge,
  SharingBadge,
  StatusBadge,
  Skeleton,
  Spinner,
  LoadingDots,
  EmptyState,
  Divider,
  Navbar,
  Tabs,
  TabContent,
  Breadcrumbs,
  ToastContainer,
  useToast,
} from '../components';
import { Music, FileText, Menu, Settings } from 'lucide-react';

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar logo="Component Showcase" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
          Component Showcase
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Explore all available components in the reusable UI library
        </p>

        <Tabs
          tabs={[
            { id: 'buttons', label: 'Buttons', icon: <Menu size={18} /> },
            { id: 'inputs', label: 'Inputs' },
            { id: 'cards', label: 'Cards' },
            { id: 'modals', label: 'Modals' },
            { id: 'badges', label: 'Badges' },
            { id: 'loaders', label: 'Loaders' },
            { id: 'navigation', label: 'Navigation' },
            { id: 'utility', label: 'Utility' },
          ]}
          activeTabId={activeTab}
          onChange={setActiveTab}
        >
          {/* Buttons Section */}
          <TabContent tabId="buttons" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Button Variants
                </h2>
                <div className="flex flex-wrap gap-4">
                  <PrimaryButton onClick={() => addToast('Primary button clicked!', 'success')}>
                    Primary Button
                  </PrimaryButton>
                  <PrimaryButton size="lg">Large Primary</PrimaryButton>
                  <SecondaryButton>Secondary Button</SecondaryButton>
                  <SecondaryButton size="sm">Small</SecondaryButton>
                  <IconButton title="Icon button">
                    <Settings size={20} />
                  </IconButton>
                  <PrimaryButton isLoading>Loading...</PrimaryButton>
                  <PrimaryButton disabled>Disabled</PrimaryButton>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Inputs Section */}
          <TabContent tabId="inputs" activeTabId={activeTab}>
            <div className="space-y-8 mt-8 max-w-md">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Input Fields
                </h2>
                <div className="space-y-4">
                  <TextInput label="Text Input" placeholder="Enter text..." />
                  <EmailInput />
                  <PasswordInput />
                  <SearchInput
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClear={() => setSearchValue('')}
                  />
                </div>
              </div>
            </div>
          </TabContent>

          {/* Cards Section */}
          <TabContent tabId="cards" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Card Types
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6">
                    <h3 className="font-bold mb-2">Generic Card</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      A basic glass-morphism card with soft shadow and hover effect.
                    </p>
                  </Card>

                  <FileCard
                    name="document.pdf"
                    size="2.5 MB"
                    date="Dec 10, 2024"
                    icon={<FileText size={32} />}
                    onDownload={() => addToast('Downloading...', 'info')}
                    onDelete={() => addToast('File deleted', 'warning')}
                  />

                  <FileCard
                    name="music.mp3"
                    size="8.1 MB"
                    date="Dec 9, 2024"
                    icon={<Music size={32} className="text-blue-500" />}
                  />
                </div>

                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                  Pricing Cards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <PricingCard
                    name="Starter"
                    price="$9"
                    description="For individuals"
                    features={['10 GB Storage', 'Basic Sharing', 'Email Support']}
                    onSelect={() => addToast('Starter plan selected', 'success')}
                  />
                  <PricingCard
                    name="Pro"
                    price="$29"
                    description="For teams"
                    features={['100 GB Storage', 'Advanced Sharing', 'Priority Support', 'Custom Branding']}
                    highlighted
                    onSelect={() => addToast('Pro plan selected', 'success')}
                  />
                  <PricingCard
                    name="Enterprise"
                    price="Custom"
                    description="For large organizations"
                    features={['Unlimited Storage', 'Advanced Sharing', '24/7 Support', 'Custom Branding', 'SSO']}
                    buttonText="Contact Us"
                    onSelect={() => addToast('Enterprise inquiry sent', 'success')}
                  />
                </div>

                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                  Storage Card
                </h3>
                <div className="max-w-sm">
                  <StorageCard used={7.5} total={100} />
                </div>
              </div>
            </div>
          </TabContent>

          {/* Modals Section */}
          <TabContent tabId="modals" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Modal Types
                </h2>
                <div className="flex flex-wrap gap-4">
                  <PrimaryButton onClick={() => setIsModalOpen(true)}>
                    Open Modal
                  </PrimaryButton>
                  <PrimaryButton onClick={() => setIsConfirmOpen(true)}>
                    Open Confirmation
                  </PrimaryButton>
                  <PrimaryButton onClick={() => setIsPasswordOpen(true)}>
                    Open Password Modal
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Badges Section */}
          <TabContent tabId="badges" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Badge Types
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Sharing Badges</h3>
                    <div className="flex gap-2">
                      <SharingBadge isPublic={true} />
                      <SharingBadge isPublic={false} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Status Badges</h3>
                    <div className="flex gap-2 flex-wrap">
                      <StatusBadge status="uploading" />
                      <StatusBadge status="completed" />
                      <StatusBadge status="error" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Loaders Section */}
          <TabContent tabId="loaders" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Loading States
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold mb-4">Spinner Sizes</h3>
                    <div className="flex gap-8 items-center">
                      <Spinner size="sm" color="currentColor" />
                      <Spinner size="md" color="currentColor" />
                      <Spinner size="lg" color="currentColor" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Loading Dots</h3>
                    <div className="text-blue-500">
                      <LoadingDots color="currentColor" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Skeleton Loaders</h3>
                    <div className="max-w-md space-y-3">
                      <Skeleton count={3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Navigation Section */}
          <TabContent tabId="navigation" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Navigation Components
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Breadcrumbs</h3>
                    <Breadcrumbs
                      items={[
                        { label: 'Home' },
                        { label: 'Files' },
                        { label: 'Documents' },
                        { label: 'Current File' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Utility Section */}
          <TabContent tabId="utility" activeTabId={activeTab}>
            <div className="space-y-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Utility Components
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-4">Dividers</h3>
                    <Divider />
                    <div className="my-4">
                      <Divider text="OR" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Empty State</h3>
                    <div className="max-w-sm">
                      <EmptyState
                        title="No files yet"
                        message="Start by uploading your first file to get started."
                        action={{
                          label: 'Upload File',
                          onClick: () => addToast('File upload started', 'info'),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>
        </Tabs>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sample Modal"
        footer={
          <div className="flex gap-3">
            <SecondaryButton
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Close
            </SecondaryButton>
            <PrimaryButton className="flex-1">
              Confirm
            </PrimaryButton>
          </div>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          This is a sample modal showing how modals work with backdrop blur and
          smooth animations.
        </p>
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => addToast('Confirmed!', 'success')}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action?"
        isDangerous={true}
      />

      <PasswordProtectionModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
        onSubmit={(password) => {
          if (password === 'demo') {
            addToast('Password correct!', 'success');
            setIsPasswordOpen(false);
          } else {
            addToast('Incorrect password', 'error');
          }
        }}
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
