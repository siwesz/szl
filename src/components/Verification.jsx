import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { dataURLtoBlob, getFileExtension } from '../utils/fileUpload';

const Verification = () => {
  const [idImage, setIdImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = (file, setImage) => {
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage({
            dataUrl: reader.result,
            type: file.type,
            originalFile: file
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleIdUpload = (e) => {
    handleFileUpload(e.target.files[0], setIdImage);
  };

  const handleSelfieUpload = (e) => {
    handleFileUpload(e.target.files[0], setSelfieImage);
  };

  const handleSubmit = async () => {
    try {
      if (!idImage || !selfieImage) {
        throw new Error('Please upload both ID and selfie images');
      }

      setLoading(true);
      setError('');

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('No user found');
      }

      // Upload ID image
      const idBlob = await dataURLtoBlob(idImage.dataUrl);
      const idExt = getFileExtension(idImage.originalFile);
      const idFilename = `${user.id}/verification/id-${Date.now()}.${idExt}`;

      const { error: idError } = await supabase.storage
        .from('user-content')
        .upload(idFilename, idBlob, {
          contentType: idImage.type,
          upsert: true
        });
      if (idError) throw idError;

      // Upload selfie image
      const selfieBlob = await dataURLtoBlob(selfieImage.dataUrl);
      const selfieExt = getFileExtension(selfieImage.originalFile);
      const selfieFilename = `${user.id}/verification/selfie-${Date.now()}.${selfieExt}`;

      const { error: selfieError } = await supabase.storage
        .from('user-content')
        .upload(selfieFilename, selfieBlob, {
          contentType: selfieImage.type,
          upsert: true
        });
      if (selfieError) throw selfieError;

      // Save verification data
      // Save or update verification data
        const { error: verificationError } = await supabase
        .from('verification_images')
        .insert({
          user_id: user.id,
          id_image_url: idFilename,
          selfie_image_url: selfieFilename
        }, {
          onConflict: 'user_id'
        });
        if (verificationError) throw verificationError;

      // Update verification status
      const { error: statusError } = await supabase
        .from('verification_status')
        .update({ status: 'pending' })
        .eq('user_id', user.id);
      if (statusError) throw statusError;

      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting verification:', error);
      setError(error.message || 'Error submitting verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Verification</h1>
      <p className="text-center text-muted-foreground">
        Please upload a photo of your ID and a selfie for verification.
      </p>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block">
            ID Image
            <input type="file" onChange={handleIdUpload} className="mt-2" />
          </label>
          {idImage && (
            <div className="relative">
              <img src={idImage.dataUrl} alt="ID" className="w-full h-32 object-cover" />
              <button onClick={() => setIdImage(null)} className="absolute top-2 right-2 p-1 bg-destructive rounded-full">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block">
            Selfie Image
            <input type="file" onChange={handleSelfieUpload} className="mt-2" />
          </label>
          {selfieImage && (
            <div className="relative">
              <img src={selfieImage.dataUrl} alt="Selfie" className="w-full h-32 object-cover" />
              <button onClick={() => setSelfieImage(null)} className="absolute top-2 right-2 p-1 bg-destructive rounded-full">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={handleSubmit} 
        className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md"
      >
        Submit Verification
      </button>
    </div>
  );
};

export default Verification;