import 'dart:convert';
import 'dart:io';

void main() async {
  final inputFile = File('enkelimeler.txt'); // veya 'kelimeler.json'
  final outputFile = File('engkelimeler.json');

  // Dosyadaki kelimeleri oku
  final lines = await inputFile.readAsLines();

  // Her satırı tırnak içine al ve virgül ekle
  final cleanedWords = lines
      .map((word) => word.trim())
      .where((word) => word.isNotEmpty)
      .toList();

  // JSON formatında veriyi oluştur
  final jsonMap = {"words": cleanedWords};

  // JSON'u dosyaya yaz
  await outputFile.writeAsString(JsonEncoder.withIndent('  ').convert(jsonMap));

  print('Kelime listesi başarıyla kaydedildi: kelimeler2.json');
}
