class Random {
  static pick(factor) {
    return Math.random() <= factor;
  }

  static between(min, max) {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
}

module.exports = Random;
