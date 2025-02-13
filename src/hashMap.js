export { HashMap };

class HashMap {
  loadFactor = 0.75;
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
    for (let pair of this.buckets[hashKey]) {
      if (pair[0] === key) {
        pair[1] = value; 
        return;
      }
    }
    // Push the new key value pair if it doesn't exist, and update values
    this.buckets[hashKey].push([key, value]);
    this.pairs++;

    if (this.pairs / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  resize() {

    this.capacity *= 2;
    const newBuckets = [];

    for (const hashKey of this.buckets) {
      if (!newBuckets[hashKey]) {
        newBuckets.push(hashKey);
      }

      for (let pair of hashKey) {
        newBuckets[hashKey].push(pair);
      }
    }

    this.buckets = newBuckets;

  }

  get(key) {
    const hashKey = this.hash(key);
    let value = null;

    if (!this.buckets[hashKey]) {
      return value
    }

    for (const pair of this.buckets[hashKey]) {
      if (pair[0] === key) value = pair[1];
    }
    return value
  }
}