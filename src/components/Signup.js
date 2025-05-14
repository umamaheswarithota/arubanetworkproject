import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Grid,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// List of available country codes for the phone number input
const countryCodes = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
];

const Signup = () => {
// State for storing form input values
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    countryCode: '+91',
  });

  // State for tracking validation errors 
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Clear any existing local storage data on component mount
   useEffect(() => {
    localStorage.clear();
  }, []);

  // Validation function for all input fields
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!formData.email.includes('@')) {
    newErrors.email = 'Email must contain "@" ';
  }else if (!formData.email.endsWith('.com')) {
      newErrors.email = 'Email must end with ".com"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fullPhone = `${formData.countryCode}${formData.phone}`;
    const dataToSave = { ...formData, phone: fullPhone };

    localStorage.setItem('signupData', JSON.stringify(dataToSave));
    setOpenSnackbar(true);
    setFormData({ username: '', phone: '', email: '', countryCode: '+91' });
    setErrors({});
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

   // Render the UI
  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url("/bg2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
           pl: { xs: 2, sm: 10, md: 100 }, 
          p: 2,
        }}
      >
        <Card
          sx={{
            width: { xs: '100%', sm: 500 },
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 6,
            boxShadow: 6,
            p: 3,
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
              Create Account
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    {/* Username Field */}
                  <TextField
                    required
                    fullWidth
                    sx={{ width: { xs: '160%'}}}
                    label="Username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    sx={{ width: { xs: '110%'}}}
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                          <FormControl variant="standard" sx={{ minWidth: 80, ml: 1 }}>
                            <Select
                              value={formData.countryCode}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  countryCode: e.target.value,
                                }))
                              }
                              disableUnderline
                            >
                              {countryCodes.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                  {country.code} ({country.label})
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Email Field */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    sx={{ width: { xs: '160%'}}}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              {/* Submit Button */}
              <Box textAlign="center" mt={4}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: 3,
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Data saved successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;
