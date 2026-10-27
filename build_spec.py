import pymupdf
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8')

html_path = r'c:\Users\C2k\Documents\antigravity\delightful-nobel\spec.html'
pdf_path = r'c:\Users\C2k\Documents\antigravity\delightful-nobel\Airbnb_Kyoto_Planner_Design_Spec.pdf'
desktop_pdf = r'C:\Users\C2k\Desktop\Airbnb_Kyoto_Planner_Design_Spec.pdf'

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

writer = pymupdf.DocumentWriter(pdf_path)
story = pymupdf.Story(html_content)

page_rect = pymupdf.Rect(0, 0, 612, 792)
body_rect = pymupdf.Rect(24, 24, 588, 768)

more = 1
page_num = 0
while more and page_num < 10:
    page_num += 1
    device = writer.begin_page(page_rect)
    more, _ = story.place(body_rect)
    story.draw(device)
    writer.end_page()

writer.close()

doc = pymupdf.open(pdf_path)
print(f'Total pages: {len(doc)}')
for i, page in enumerate(doc):
    lines = [l.strip() for l in page.get_text().split('\n') if l.strip()]
    first = lines[0] if lines else ''
    last = lines[-1] if lines else ''
    print(f'Page {i+1}: First line: "{first}" | Last line: "{last}"')
    pix = page.get_pixmap(dpi=150)
    pix.save(f'c:\\Users\\C2k\\Documents\\antigravity\\delightful-nobel\\page_{i+1}_final.png')
doc.close()

shutil.copyfile(pdf_path, desktop_pdf)
print(f'Copied to desktop successfully: {desktop_pdf}')
