import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '../../components/Icons.jsx';
// CalendarPicker import removed as it's no longer used
import { useAuth } from '../Login/AuthContext.jsx';
import { getProfile, updateProfile, getAddress, upsertAddress } from '../../api/users.api.js';

export default function AccountSettingsPage(){
  const auth = useAuth();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const [saved, setSaved] = useState({});

  // Live form state
  const [username,     setUsername]     = useState('');
  const [email,         setEmail]        = useState('');
  const [firstname,    setFirstname]    = useState('');
  const [lastname,     setLastname]     = useState('');
  const [phone,        setPhone]        = useState('');
  const [dob,          setDob]          = useState('');
  const [gender,       setGender]       = useState('');
  const [genderOther,  setGenderOther]  = useState('');
  const [houseNo,      setHouseNo]      = useState('');
  const [streetName,   setStreetName]   = useState('');
  const [subDistrict,  setSubDistrict]  = useState('');
  const [district,     setDistrict]     = useState('');
  const [province,     setProvince]     = useState('');
  const [postalCode,   setPostalCode]   = useState('');
  

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDateTH(d){
    if (!d) return "DD/MM/YYYY";
    const dateObj = new Date(d);
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${dateObj.getFullYear()}`;
  }

  useEffect(() => {
    async function fetchUserData(){
      if(!token){
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const profileData = await getProfile(token);
        
        let addressData = {};
        try {
          addressData = await getAddress(token);
        } catch (err) {
          console.log('No address data found:', err.message);
        }

        let dobValue = '';
        if (profileData.date_of_birth) {
          dobValue = profileData.date_of_birth; // Keep as string/date from DB
        }

        const userData = {
          username: profileData.username || '',
          email: profileData.email || '',
          firstname: profileData.first_name || '',
          lastname: profileData.last_name || '',
          phone: profileData.phone || '',
          dob: dobValue,
          gender: profileData.gender || 'other',
          genderOther: profileData.gender_other || '',
          houseNo: addressData.house_no || '',
          streetName: addressData.street_name || '',
          subDistrict: addressData.sub_district || '',
          district: addressData.district || '',
          province: addressData.province || '',
          postalCode: addressData.postal_code || ''
        };

        setSaved(userData);
        loadProfileToForm(userData);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [token]);

  const loadProfileToForm = (data) => {
    setUsername(data.username);
    setEmail(data.email);
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPhone(data.phone);
    setDob(data.dob);
    setGender(data.gender);
    setGenderOther(data.genderOther);
    setHouseNo(data.houseNo);
    setStreetName(data.streetName);
    setSubDistrict(data.subDistrict);
    setDistrict(data.district);
    setProvince(data.province);
    setPostalCode(data.postalCode);
  };

  function handleReset(){
    loadProfileToForm(saved);
  }

  async function handleSave(){
    if(!token){
      setError('No token found. Please login again.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      // dob is now treated as read-only, so we just send back what we loaded
      const dobString = dob instanceof Date ? dob.toISOString().split('T')[0] : dob;

      await updateProfile({
        username,
        first_name: firstname,
        last_name: lastname,
        phone,
        date_of_birth: dobString,
        gender,
        gender_other: genderOther
      }, token);

      await upsertAddress({
        house_no: houseNo,
        street_name: streetName,
        sub_district: subDistrict,
        district,
        province,
        postal_code: postalCode
      }, token);

      const newSaved = { 
        username, email, firstname, lastname, phone, dob, gender, genderOther, 
        houseNo, streetName, subDistrict, district, province, postalCode 
      };
      setSaved(newSaved);
      alert('Profile saved successfully!');
    } catch (err){
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="account-settings-wrapper">
      {loading && <div style={{ textAlign: 'center', padding: '2rem' }}><p>Loading profile...</p></div>}
      
      {error && (
        <div style={{ color: 'red', padding: '1rem', marginBottom: '1rem', border: '1px solid red', borderRadius: '4px' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && (
      <>
      <div className="acct-card-container">
        <div className="acct-avatar">
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
             <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h1 className="acct-title">Account Settings</h1>

        <div className="acct-form-grid">
          <div></div>
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input type="text" className="auth-input" value={username} onChange={e => setUsername(e.target.value)} />
          </div>

          <div className="auth-field">
            <label className="auth-label">First name</label>
            <input type="text" className="auth-input" value={firstname} onChange={e => setFirstname(e.target.value)} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Last name</label>
            <input type="text" className="auth-input" value={lastname} onChange={e => setLastname(e.target.value)} />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input type="email" className="auth-input grey-bg" value={email} readOnly />
          </div>
          <div className="auth-field">
            <label className="auth-label">Phone number</label>
            <input type="tel" className="auth-input" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <div className="auth-field">
              <label className="auth-label">Birthday</label>
              <div className="auth-input grey-bg" style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}>
                <span style={{ flex: 1, color: '#555' }}>
                    {dob ? formatDateTH(dob) : "DD/MM/YYYY"}
                </span>
              </div>
          </div>

          <div className="auth-field">
              <label className="auth-label">Gender</label>
              <div className="auth-radio-group">
                  {['male', 'female', 'other'].map(v => (
                  <label key={v}>
                      <input type="radio" name="gender" value={v} checked={gender === v} onChange={() => setGender(v)} /> {v}
                  </label>
                  ))}
                  {gender === 'other' && (
                  <input type="text" className="auth-input" style={{ width: '90px', padding: '0.4rem 0.6rem', marginLeft: '5px' }} value={genderOther} onChange={e => setGenderOther(e.target.value)} />
                  )}
              </div>
          </div>

          <div className="address-section">
              <label className="auth-label" style={{ fontSize: '1rem', color: '#1A2700', marginBottom: '10px', display: 'block' }}>Address</label>
              <div className="address-row">
                <div className="auth-field" style={{ flex: '1' }}>
                    <label className="auth-label">House number</label>
                    <input type="text" className="auth-input" value={houseNo} onChange={e => setHouseNo(e.target.value)} />
                </div>
                <div className="auth-field" style={{ flex: '2.5' }}>
                    <label className="auth-label">Street name</label>
                    <input type="text" className="auth-input" value={streetName} onChange={e => setStreetName(e.target.value)} />
                </div>
                <div className="auth-field" style={{ flex: '2.5' }}>
                    <label className="auth-label">Sub-district</label>
                    <input type="text" className="auth-input" value={subDistrict} onChange={e => setSubDistrict(e.target.value)} />
                </div>
              </div>

              <div className="address-row" style={{ marginBottom: '0' }}>
                <div className="auth-field" style={{ flex: '2' }}>
                  <label className="auth-label">District</label>
                  <input type="text" className="auth-input" value={district} onChange={e => setDistrict(e.target.value)} />
                </div>
                <div className="auth-field" style={{ flex: '2' }}>
                  <label className="auth-label">Province</label>
                  <input type="text" className="auth-input" value={province} onChange={e => setProvince(e.target.value)} />
                </div>
                <div className="auth-field" style={{ flex: '1.5' }}>
                  <label className="auth-label">Postal_code</label>
                  <input type="text" className="auth-input" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="acct-action-bar">
        <button className="acct-btn-reset" onClick={handleReset} type="button">Reset</button>
        <button className="acct-btn-save" onClick={handleSave} disabled={saving} type="button">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      </>
      )}
    </div>
  );
}