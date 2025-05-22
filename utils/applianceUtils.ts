import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';

// Constants for calculations
const ELECTRICITY_RATE = 8; // Rs per kWh
const CO2_PER_KWH = 0.5; // kg of CO2 per kWh

export interface Appliance {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  wattage: number;
  hoursPerDay: number;
  icon: string;
  status: 'active' | 'inactive';
  userId: string;
}

export interface DailyUsage {
  id: string;
  userId: string;
  applianceId: string;
  date: string;
  hoursUsed: number;
  wattage: number;
  kwh: number;
  cost: number;
  co2: number;
}

export const calculateApplianceMetrics = (wattage: number, hoursPerDay: number) => {
  const dailyKwh = (wattage * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * ELECTRICITY_RATE;
  const monthlyCO2 = monthlyKwh * CO2_PER_KWH;

  return {
    dailyKwh,
    monthlyKwh,
    monthlyCost,
    monthlyCO2
  };
};

export const addAppliance = async (appliance: Omit<Appliance, 'id'>, userId: string) => {
  try {
    const applianceData = {
      ...appliance,
      userId,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'appliances'), applianceData);
    return { id: docRef.id, ...applianceData };
  } catch (error) {
    console.error('Error adding appliance:', error);
    throw error;
  }
};

export const updateAppliance = async (id: string, updates: Partial<Appliance>) => {
  try {
    const applianceRef = doc(db, 'appliances', id);
    await updateDoc(applianceRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.error('Error updating appliance:', error);
    throw error;
  }
};

export const deleteAppliance = async (id: string) => {
  try {
    const applianceRef = doc(db, 'appliances', id);
    await deleteDoc(applianceRef);
    return id;
  } catch (error) {
    console.error('Error deleting appliance:', error);
    throw error;
  }
};

export const getUserAppliances = async (userId: string) => {
  try {
    const appliancesQuery = query(
      collection(db, 'appliances'),
      where('userId', '==', userId)
    );
    console.log('Querying appliances for userId:', userId);
    const querySnapshot = await getDocs(appliancesQuery);
    console.log('Query snapshot docs:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Appliance[];
  } catch (error) {
    console.error('Error getting user appliances:', error);
    throw error;
  }
};

export const addDailyUsage = async (usage: Omit<DailyUsage, 'id' | 'kwh' | 'cost' | 'co2'>) => {
  try {
    const kwh = (usage.wattage * usage.hoursUsed) / 1000;
    const cost = kwh * ELECTRICITY_RATE;
    const co2 = kwh * CO2_PER_KWH;

    const usageData = {
      ...usage,
      kwh,
      cost,
      co2,
    };

    const docRef = await addDoc(collection(db, 'dailyUsage'), usageData);
    return { id: docRef.id, ...usageData };
  } catch (error) {
    console.error('Error adding daily usage:', error);
    throw error;
  }
};

export const getUserDailyUsage = async (userId: string, startDate: string, endDate: string) => {
  try {
    const q = query(
      collection(db, 'dailyUsage'),
      where('userId', '==', userId),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DailyUsage[];
  } catch (error) {
    console.error('Error getting daily usage:', error);
    throw error;
  }
}; 