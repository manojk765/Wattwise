export const generateDummyApplianceData = () => {
  return [
    {
      id: '1',
      name: 'Air Conditioner',
      brand: 'Samsung',
      model: 'WindFree',
      category: 'Cooling',
      wattage: 1500,
      hoursPerDay: 6,
      usageKwh: 9.0,
      monthlyCost: 720,
      icon: 'airVent',
      status: 'active',
    },
    {
      id: '2',
      name: 'Refrigerator',
      brand: 'LG',
      model: 'Smart Inverter',
      category: 'Kitchen',
      wattage: 150,
      hoursPerDay: 24,
      usageKwh: 3.6,
      monthlyCost: 288,
      icon: 'refrigerator',
      status: 'active',
    },
    {
      id: '3',
      name: 'Washing Machine',
      brand: 'Whirlpool',
      model: 'Fresh Care+',
      category: 'Laundry',
      wattage: 500,
      hoursPerDay: 1,
      usageKwh: 0.5,
      monthlyCost: 40,
      icon: 'washingMachine',
      status: 'active',
    },
    {
      id: '4',
      name: 'TV - Living Room',
      brand: 'Sony',
      model: 'Bravia 4K',
      category: 'Entertainment',
      wattage: 100,
      hoursPerDay: 4,
      usageKwh: 0.4,
      monthlyCost: 32,
      icon: 'tv',
      status: 'active',
    },
    {
      id: '5',
      name: 'Water Heater',
      brand: 'Havells',
      model: 'Instanio',
      category: 'Bathroom',
      wattage: 2000,
      hoursPerDay: 1,
      usageKwh: 2.0,
      monthlyCost: 160,
      icon: 'droplets',
      status: 'active',
    },
  ];
};

export const generateDummyUsageData = (period: string, unit: string) => {
  let data = [];
  
  switch (period) {
    case 'daily':
      // 24 hours of the day
      data = Array.from({ length: 24 }, (_, i) => {
        // Create a pattern with morning and evening peaks
        let value;
        if (i >= 6 && i <= 9) {
          // Morning peak
          value = 0.3 + Math.random() * 0.2;
        } else if (i >= 18 && i <= 22) {
          // Evening peak
          value = 0.5 + Math.random() * 0.3;
        } else if (i >= 0 && i <= 5) {
          // Night low
          value = 0.1 + Math.random() * 0.1;
        } else {
          // Midday moderate
          value = 0.2 + Math.random() * 0.2;
        }
        
        // Convert to appropriate unit
        if (unit === 'cost') {
          value = value * 8; // Approximate Rs per kWh
        } else if (unit === 'co2') {
          value = value * 0.5; // Approximate kg CO2 per kWh
        }
        
        return {
          time: `${i}:00`,
          value: parseFloat(value.toFixed(2))
        };
      });
      break;
      
    case 'weekly':
      // 7 days of the week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      data = days.map((day, i) => {
        // Weekend vs weekday pattern
        let value;
        if (i === 0 || i === 6) {
          // Weekend higher usage
          value = 8 + Math.random() * 2;
        } else {
          // Weekday with variation
          value = 6 + Math.random() * 3;
        }
        
        // Convert to appropriate unit
        if (unit === 'cost') {
          value = value * 8; // Approximate Rs per kWh
        } else if (unit === 'co2') {
          value = value * 0.5; // Approximate kg CO2 per kWh
        }
        
        return {
          time: day,
          value: parseFloat(value.toFixed(2))
        };
      });
      break;
      
    case 'monthly':
      // Last 30 days as numbers
      data = Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        
        // Seasonal pattern - gradually decreasing (summer to monsoon for example)
        let value = 9 - (i / 30) * 3 + Math.random() * 2;
        
        // Convert to appropriate unit
        if (unit === 'cost') {
          value = value * 8; // Approximate Rs per kWh
        } else if (unit === 'co2') {
          value = value * 0.5; // Approximate kg CO2 per kWh
        }
        
        return {
          time: day.toString(),
          value: parseFloat(value.toFixed(2))
        };
      });
      break;
      
    case 'yearly':
      // 12 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = months.map((month, i) => {
        // Seasonal pattern with summer peak
        let value;
        if (i >= 3 && i <= 6) {
          // Summer months (Apr-Jul) - higher consumption
          value = 240 + Math.random() * 40;
        } else if (i >= 10 || i <= 1) {
          // Winter months (Nov-Feb) - moderate consumption
          value = 180 + Math.random() * 30;
        } else {
          // Spring/Fall - lower consumption
          value = 150 + Math.random() * 30;
        }
        
        // Convert to appropriate unit
        if (unit === 'cost') {
          value = value * 8; // Approximate Rs per kWh
        } else if (unit === 'co2') {
          value = value * 0.5; // Approximate kg CO2 per kWh
        }
        
        return {
          time: month,
          value: parseFloat(value.toFixed(2))
        };
      });
      break;
  }
  
  return data;
};

export const generateDummyLeaderboardData = (scope: string) => {
  const baseUsers = [
    { id: '1', name: 'John Doe', points: 340, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '2', name: 'EcoWarrior01', points: 840, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '3', name: 'Green Thumb', points: 760, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '4', name: 'EnergySaver', points: 680, avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '5', name: 'WattWatcher', points: 620, avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '6', name: 'PowerPro', points: 580, avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '7', name: 'EcoFriendly', points: 520, avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '8', name: 'GreenEnergy', points: 480, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '9', name: 'EcoSaver', points: 420, avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '10', name: 'PowerSaver', points: 380, avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];
  
  // Add more users based on scope
  if (scope === 'city') {
    for (let i = 11; i <= 20; i++) {
      baseUsers.push({
        id: i.toString(),
        name: `CityUser${i}`,
        points: Math.floor(Math.random() * 300) + 100,
        avatar: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
      });
    }
  } else if (scope === 'global') {
    for (let i = 11; i <= 30; i++) {
      baseUsers.push({
        id: i.toString(),
        name: `GlobalUser${i}`,
        points: Math.floor(Math.random() * 500) + 100,
        avatar: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
      });
    }
  }
  
  // Sort by points (highest first)
  return baseUsers.sort((a, b) => b.points - a.points);
};