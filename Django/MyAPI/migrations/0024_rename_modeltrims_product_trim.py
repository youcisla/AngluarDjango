# Generated by Django 4.2 on 2023-06-13 21:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MyAPI', '0023_rename_name_product_make_product_model_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='ModelTrims',
            new_name='Trim',
        ),
    ]