import React, {useCallback} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {AdvancedImage} from 'cloudinary-react-native';

const cloudinaryConfig = {
  cloudName: 'YOUR_CLOUD_NAME',
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
  uploadPreset: 'YOUR_UPLOAD_PRESET',
};

interface ProfileImageProps {
  onChange: (value: string) => void;
  value: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({onChange, value}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.secure_url);
    },
    [onChange],
  );

  const handleImagePicker = (
    callback: (response: ImagePickerResponse) => void,
  ) => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };

    callback(options);
  };

  const handleImageLibrary = () => {
    handleImagePicker(options => {
      launchImageLibrary();
    });
  };

  const handleCamera = () => {
    handleImagePicker(options => {
      launchCamera(options, response => {
        handleImageResponse(response);
      });
    });
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      // Upload image to Cloudinary
      const data = new FormData();
      data.append('file', {
        uri: response.uri,
        type: response.type,
        name: response.fileName, // Using fileName for compatibility
      } as any); // Cast to any for compatibility

      data.append('upload_preset', cloudinaryConfig.uploadPreset);

      fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: data,
        },
      )
        .then(response => response.json())
        .then(handleUpload)
        .catch(error => {
          console.error('Error uploading image to Cloudinary: ', error);
          Alert.alert('Error', 'Failed to upload image. Please try again.');
        });
    }
  };

  return (
    <View>
      {value ? (
        <AdvancedImage
          cldImg={{cloudName: cloudinaryConfig.cloudName, imageName: value}}
        />
      ) : (
        <View>
          <TouchableOpacity onPress={handleImageLibrary}>
            <Text>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCamera}>
            <Text>Take Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileImage;
