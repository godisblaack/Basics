Link: https://leetcode.com/problems/can-place-flowers/description/

**My solution**

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        if (n == 0) {
            return true;
        }
        
        if (flowerbed.size() == 0 && n == 0) {
            return true;
        } else if (flowerbed.size() == 0 && n == 1) {
            return false;
        } else if (flowerbed.size() == 1 && n == 1 && flowerbed[0] == 0) {
            return true;
        } else if (flowerbed.size() == 1 && n == 1 && flowerbed[0] == 1) {
            return false;
        } 

        if (flowerbed[0] == 0 && flowerbed[1] == 0) {
            flowerbed[0] = 1;
            
            n--;
            
            if (n == 0) {
                return true;
            }
        }

        for (int i = 1; i < flowerbed.size() - 1; i++) {
            if (flowerbed[i - 1] == 0 && flowerbed[i + 1] == 0) {
                if (flowerbed[i] == 0) {
                    flowerbed[i] = 1;

                    n--;

                    if (n == 0) {
                        return true;
                    }
                }
            }
        }

        if (flowerbed[flowerbed.size() - 1] == 0 && flowerbed[flowerbed.size() - 2] == 0) {
            flowerbed[flowerbed.size() - 1] == 1;

            n--;

            if (n == 0) {
                return true;
            }
        }

        return false;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution, but there is a better way to write it.

**Simplifies solution**

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        int count = 0;
        int size = flowerbed.size();

        for (int i = 0; i < size; ++i) {
            if (flowerbed[i] == 0) {
                bool can_plant = true;
                // Check left neighbor
                if (i > 0 && flowerbed[i - 1] == 1) {
                    can_plant = false;
                }
                // Check right neighbor
                if (i < size - 1 && flowerbed[i + 1] == 1) {
                    can_plant = false;
                }

                if (can_plant) {
                    flowerbed[i] = 1; // Plant the flower
                    count++;
                    if (count >= n) {
                        return true;
                    }
                }
            }
        }

        return count >= n;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)