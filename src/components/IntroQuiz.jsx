import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { dataURLtoBlob, validateImageFile, getFileExtension } from '../utils/fileUpload';

const questions = [
  {
    category: 'Basic Info',
    question: 'What\'s your name?',
    type: 'text',
    key: 'name'
  },
  {
    category: 'Basic Info',
    question: 'Choose a username',
    type: 'text',
    key: 'username'
  },
  {
    category: 'Basic Info',
    question: 'How old are you?',
    type: 'number',
    key: 'age'
  },
  {
    category: 'Basic Info',
    question: 'What\'s your relationship status?',
    options: ['Single', 'In a relationship', 'Married', 'Divorced'],
    key: 'relationshipStatus'
  },
  {
    category: 'Seeking',
    question: 'What are you seeking?',
    options: ['Once-off', 'Bestie with benefits', 'FFF threesomes', 'No strings attached', 'Discreet fun', 'Regular hookup'],
    key: 'seeking'
  },
  {
    category: 'Identity',
    question: 'Who are you?',
    options: ['Corporate baddie', 'Corporate professional', 'Spiritual soul', 'Creative', 'Homebody', 'Introvert', 'Social butterfly', 'Fitness enthusiast', 'Traveler'],
    key: 'identity'
  },
  {
    category: 'Smoking',
    question: 'What\'s your smoking habit?',
    options: ['Smoker', 'Non-smoker', 'Occasional smoker'],
    key: 'smokingHabit'
  },
  {
    category: 'Body Type',
    question: 'How would you describe your body type?',
    options: ['Slim', 'Slim Thick', 'Thick', 'BBW', 'Tall', 'Short'],
  },
  {
    category: 'Kinks/Fetishes',
    question: 'Select your kinks/fetishes (choose all that apply):',
    options: ['Strap-on', 'Scissoring/Tribbing', 'Toys', 'Voyeurism', 'Exhibitionism', 'Feet', 'Roleplay', 'FFF Threesomes', 'Bondage'],
    multiple: true,
  },
  {
    category: 'Body Preferences',
    question: 'Do you have any of the following?',
    options: ['Piercings', 'Tattoos'],
    multiple: true,
  },
  {
    category: 'Identity',
    question: 'How do you identify?',
    options: ['Femme', 'Stud', 'Stem', 'Butch', 'Soft Butch', 'Tomboy'],
  },
  {
    category: 'Privacy Level',
    question: 'What\'s your preferred privacy level?',
    options: ['Open', 'Discreet'],
  },
  {
    category: 'Roles',
    question: 'What roles do you prefer? (choose all that apply)',
    options: ['Domme', 'Sub', 'Switch', 'Mommy', 'Voyeur', 'Little', 'Exhibitionist'],
    multiple: true,
  },
  {
    category: 'Boundaries',
    question: 'What are your boundaries? (choose all that apply)',
    options: ['Strap-on', 'Scissoring/Tribbing', 'Toys', 'Voyeurism', 'Exhibitionism', 'Feet', 'Roleplay', 'FFF Threesomes', 'Bondage'],
    multiple: true,
    key: 'boundaries'
  },
];

const IntroQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [images, setImages] = useState(Array(6).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    const question = questions[currentQuestion];
    if (question.type === 'text' || question.type === 'number') {
      setAnswers(prev => ({
        ...prev,
        [question.key]: option
      }));
    } else if (question.multiple) {
      setAnswers(prev => ({
        ...prev,
        [question.category]: [
          ...(prev[question.category] || []),
          option
        ]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [question.category]: option
      }));
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validateImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => {
            const newImages = [...prev];
            newImages[index] = {
              dataUrl: reader.result,
              file,
              type: file.type
            };
            return newImages;
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validateImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage({
            dataUrl: reader.result,
            file,
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Please sign in again');
      }

      if (!profileImage) {
        throw new Error('Please upload a profile picture');
      }

      const profileBlob = await dataURLtoBlob(profileImage.dataUrl);
      const profileExt = getFileExtension(profileImage.file);
      const profileFilename = `${user.id}/profile-${Date.now()}.${profileExt}`;

      const { error: profileUploadError } = await supabase.storage
        .from('user-content')
        .upload(profileFilename, profileBlob, {
          contentType: profileImage.type,
          upsert: true
        });
      
      if (profileUploadError) throw profileUploadError;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: answers.name,
          username: answers.username,
          age: answers.age,
          relationship_status: answers.relationshipStatus,
          seeking: answers.seeking,
          identity: answers.identity,
          smoking_habit: answers.smokingHabit,
          body_type: answers['Body Type'],
          privacy_level: answers['Privacy Level'],
          profile_picture: profileFilename
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;

      const preferences = [
        ...(answers['Kinks/Fetishes'] || []),
        ...(answers['Body Preferences'] || [])
      ];

      if (preferences.length > 0) {
        const { error: prefError } = await supabase
          .from('preferences')
          .insert(
            preferences.map(pref => ({
              user_id: user.id,
              preference: pref
            }))
          );
        
        if (prefError) throw prefError;
      }

      if (answers['Roles']?.length > 0) {
        const { error: rolesError } = await supabase
          .from('roles')
          .insert(
            answers['Roles'].map(role => ({
              user_id: user.id,
              role: role
            }))
          );
        
        if (rolesError) throw rolesError;
      }

      if (answers['boundaries']?.length > 0) {
        const { error: boundariesError } = await supabase
          .from('boundaries')
          .insert(
            answers['boundaries'].map(boundary => ({
              user_id: user.id,
              boundary: boundary
            }))
          );
        
        if (boundariesError) throw boundariesError;
      }

      const imagePromises = images
        .filter(image => image !== null)
        .map(async (image, index) => {
          const blob = await dataURLtoBlob(image.dataUrl);
          const ext = getFileExtension(image.file);
          const filename = `${user.id}/${Date.now()}-${index}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from('user-content')
            .upload(filename, blob, {
              contentType: image.type,
              upsert: true
            });
            
          if (uploadError) throw uploadError;

          const { error: imageError } = await supabase
            .from('user_images')
            .insert({
              user_id: user.id,
              image_url: filename,
              is_profile_picture: index === 0
            });
            
          if (imageError) throw imageError;

          return filename;
        });

      await Promise.all(imagePromises);

      navigate('/verification');

    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error.message || 'Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-primary">Let's get started</h1>
      {!quizComplete ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].type === 'text' || questions[currentQuestion].type === 'number' ? (
            <input
              type={questions[currentQuestion].type}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300"
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`p-2 rounded-md transition-colors ${
                    answers[questions[currentQuestion].category]?.includes(option)
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-4">
            <button onClick={prevQuestion} disabled={currentQuestion === 0} className="bg-accent text-accent-foreground px-4 py-2 rounded-md disabled:opacity-50">
              <ChevronLeft className="inline-block mr-2" />
              Previous
            </button>
            <button onClick={nextQuestion} className="bg-accent text-accent-foreground px-4 py-2 rounded-md">
              {currentQuestion === questions.length - 1 ? 'Done' : 'Next'}
              <ChevronRight className="inline-block ml-2" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-primary">Upload your images</h2>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
            <div className="relative">
              {profileImage ? (
                <img src={profileImage.dataUrl} alt="Profile" className="w-full h-48 object-cover rounded-lg" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                onChange={handleProfileImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {profileImage && (
                <button 
                  onClick={() => setProfileImage(null)}
                  className="absolute top-2 right-2 p-1 bg-destructive rounded-full"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>

          <h3 className="text-lg font-medium">Additional Photos</h3>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                {image ? (
                  <img src={image.dataUrl} alt={`Uploaded ${index}`} className="w-full h-32 object-cover" />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                    <Upload />
                  </div>
                )}
                <input type="file" onChange={(e) => handleImageUpload(e, index)} className="absolute inset-0 opacity-0 cursor-pointer" />
                <button onClick={() => setImages(prev => prev.map((img, i) => (i === index ? null : img)))}>
                  <X />
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mt-4">
              {error}
            </div>
          )}
          
          <button 
            onClick={handleSubmit} 
            className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md"
          >
            Complete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default IntroQuiz;

