import { useState } from 'react';
import { XMarkIcon, StarIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { tenantService } from '../services/tenantService';
import Button from './ui/Button';
import Card from './ui/Card';

const UpgradeModal = ({ isOpen, onClose, onUpgradeSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const tenantSlug = user?.tenant?.slug;

  const handleUpgrade = async () => {
    if (!isAdmin || !tenantSlug) {
      alert('Only admins can upgrade the tenant plan.');
      return;
    }

    try {
      setLoading(true);
      await tenantService.upgradeTenant(tenantSlug);
      alert('Successfully upgraded to Pro plan!');
      
      // Call the success callback if provided
      if (onUpgradeSuccess) {
        onUpgradeSuccess();
      }
      
      onClose();
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert(error.response?.data?.message || 'Upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <Card.Body className="pt-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upgrade to Pro
              </h3>
              
              <p className="text-sm text-gray-500 mb-6">
                You've reached the limit for free accounts. 
                {isAdmin 
                  ? ' As an admin, you can upgrade your tenant to Pro to unlock unlimited notes!'
                  : ' Please contact your admin to upgrade to Pro for unlimited notes.'
                }
              </p>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Pro Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited notes
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Advanced features
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Export capabilities
                  </li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  {isAdmin ? 'Maybe Later' : 'Close'}
                </Button>
                {isAdmin && (
                  <Button
                    onClick={handleUpgrade}
                    loading={loading}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {loading ? 'Upgrading...' : 'Upgrade Now'}
                  </Button>
                )}
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default UpgradeModal;