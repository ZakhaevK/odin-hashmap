export { HashMap };

class HashMap {
  loadFactor = 0.8;
  capacity = 16;
  pairs = 0;
  buckets = [];

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i));
    }
 
    return hashCode % this.capacity;
  } 


  set(key, value) {
    const hashKey = this.hash(key);
    
    // Add new hashKey bucket, should it not exist
    if (!this.buckets[hashKey]) {
      this.buckets[hashKey] = [];
    }


    // Handle existing entry in bucket, by overwriting the value
    for (let entry of this.buckets[hashKey]) {
      if (entry[0] === key) {
        entry[1] = value; 
        return;
      }
    }
    // Push the new key value pair if it doesn't exist, and update values
    this.buckets[hashKey].push([key, value]);
    this.pairs++;

    // !!! Resize to be added here once method is implemented !!!
  }
}