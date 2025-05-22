import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Search, LightbulbOff, WashingMachine, Tv, Refrigerator, Fan, Zap } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import ApplianceCard from '@/components/ApplianceCard';
import Header from '@/components/Header';
import { Appliance } from '@/utils/applianceUtils';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function AppliancesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { appliances, removeAppliance } = useData();
  const isDark = theme === 'dark';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredAppliances = appliances.filter(appliance => {
    const matchesSearch = appliance.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || appliance.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories: Category[] = [
    { id: 'All', name: 'All', icon: <Zap size={20} color={colors.primary} /> },
    { id: 'Kitchen', name: 'Kitchen', icon: <Refrigerator size={20} color={colors.primary} /> },
    { id: 'Laundry', name: 'Laundry', icon: <WashingMachine size={20} color={colors.primary} /> },
    { id: 'Entertainment', name: 'Entertainment', icon: <Tv size={20} color={colors.primary} /> },
    { id: 'Cooling', name: 'Cooling', icon: <Fan size={20} color={colors.primary} /> },
  ];

  const handleEdit = (id: string) => {
    router.push({
      pathname: '/appliances/edit',
      params: { id }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await removeAppliance(id);
    } catch (error) {
      console.error('Error deleting appliance:', error);
    }
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
        { backgroundColor: isDark ? colors.cardDark : colors.card }
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      {item.icon}
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
          { color: isDark ? colors.textDark : colors.text }
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderApplianceItem = ({ item }: { item: Appliance }) => (
    <ApplianceCard
      appliance={item}
      onPress={() => router.push(`/appliances/${item.id}`)}
      onEdit={() => handleEdit(item.id)}
      onDelete={() => handleDelete(item.id)}
      isDark={isDark}
    />
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.backgroundDark : colors.background }
    ]}>
      <Header title="My Appliances" icon={<LightbulbOff size={24} color={colors.primary} />} />
      
      <View style={styles.actionHeader}>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/appliances/add')}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={[
        styles.searchContainer,
        { backgroundColor: isDark ? colors.cardDark : colors.card }
      ]}>
        <Search size={20} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? colors.textDark : colors.text }]}
          placeholder="Search appliances..."
          placeholderTextColor={isDark ? colors.textTertiaryDark : colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {filteredAppliances.length > 0 ? (
        <FlatList
          data={filteredAppliances}
          keyExtractor={(item) => item.id}
          renderItem={renderApplianceItem}
          contentContainerStyle={styles.appliancesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <LightbulbOff size={64} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
          <Text style={[styles.emptyText, { color: isDark ? colors.textDark : colors.text }]}>
            No appliances found
          </Text>
          <Text style={[styles.emptySubtext, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            {searchQuery || selectedCategory !== 'All'
              ? 'Try changing your search or filter'
              : 'Add your first appliance to start tracking'}
          </Text>
          {!searchQuery && selectedCategory === 'All' && (
            <TouchableOpacity
              style={[styles.addFirstButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/appliances/add')}
            >
              <Text style={styles.addFirstButtonText}>Add Your First Appliance</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 8,
  },
  categoryItemActive: {
    backgroundColor: `${colors.primary}20`,
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  appliancesList: {
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  addFirstButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  addFirstButtonText: {
    color: 'white',
    fontWeight: '600',
  },
}); 