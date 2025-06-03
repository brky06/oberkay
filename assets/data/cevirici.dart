import 'dart:convert';
import 'dart:io';

void main() async {
  final inputFile = File('kelimeler.json');
  final outputFile = File('kelimeler2.json');

  try {
    final contents = await inputFile.readAsString();

    final jsonData = jsonDecode(contents);

    final lowercaseWords = (jsonData['words'] as List)
        .map((word) => word.toString().toLowerCase())
        .toList();

    final newJson = jsonEncode({'words': lowercaseWords});

    await outputFile.writeAsString(newJson, mode: FileMode.write, flush: true);

    print('Kelimeler başarıyla lowercase yapıldı ve kelimeler2.json dosyasına kaydedildi.');
  } catch (e) {
    print('Hata oluştu: $e');
  }
}
